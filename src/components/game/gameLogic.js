export class Character {
    static currentId = 0;

    constructor(characterName, health, attack, defense, dodge, gold, experience) {
        this.characterName = characterName;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.dodge = dodge;
        this.gold = gold;
        this.experience = experience;
        this.id = Character.generateId();
    }

    healthStatus () {
        return `${this.characterName} has ${this.health} HP`;
    }

    static generateId () {
        return Character.currentId++;
    }
}

export const getEnemies = async () => {
    try {
        // const response = await fetch(URL + "enemies.json");
        // const enemies = await response.json();

        const arrayEnemies = [];
        enemies.forEach(enemy => {
            arrayEnemies.push(
                new Character(
                    enemy.name,
                    enemy.health,
                    enemy.attack,
                    enemy.defense,
                    enemy.dodge,
                    enemy.gold,
                    enemy.experience
                )
            );
        });
        return arrayEnemies;
    } catch (error) {
        console.log(error);
        return [];
    }
};



// Save the game state to SQLite
export function saveGameState (userCurrent, arrayEnemies) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("DELETE FROM userCurrent;");
            tx.executeSql("DELETE FROM enemies;");

            // Insert userCurrent
            tx.executeSql(
                "INSERT INTO userCurrent (characterName, health, attack, defense, dodge, gold, experience) VALUES (?, ?, ?, ?, ?, ?, ?);",
                [userCurrent.characterName, userCurrent.health, userCurrent.attack, userCurrent.defense, userCurrent.dodge, userCurrent.gold, userCurrent.experience]
            );

            // Insert enemies
            arrayEnemies.forEach(enemy => {
                tx.executeSql(
                    "INSERT INTO enemies (characterName, health, attack, defense, dodge, gold, experience) VALUES (?, ?, ?, ?, ?, ?, ?);",
                    [enemy.characterName, enemy.health, enemy.attack, enemy.defense, enemy.dodge, enemy.gold, enemy.experience]
                );
            });
        },
            (error) => {
                console.log("Error saving game state: ", error);
                reject(error);
            },
            () => {
                console.log("Game state saved successfully!");
                resolve(true);
            });
    });
}

// Load the game state from SQLite
export function loadGameState () {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM userCurrent LIMIT 1;", [], (txObj, userRes) => {
                let loadedUser = null;
                if (userRes.rows.length > 0) {
                    const row = userRes.rows.item(0);
                    loadedUser = new Character(row.characterName, row.health, row.attack, row.defense, row.dodge, row.gold, row.experience);
                }

                tx.executeSql("SELECT * FROM enemies;", [], (txObj2, enemiesRes) => {
                    let loadedEnemies = [];
                    for (let i = 0; i < enemiesRes.rows.length; i++) {
                        const e = enemiesRes.rows.item(i);
                        loadedEnemies.push(
                            new Character(e.characterName, e.health, e.attack, e.defense, e.dodge, e.gold, e.experience)
                        );
                    }

                    resolve({ user: loadedUser, enemies: loadedEnemies });
                });
            });
        },
            (error) => {
                console.log("Error loading game state: ", error);
                reject(error);
            });
    });
}

// Calculate fight damage and return logs
function fightDamage (character_1, character_2) {
    let arrayCharactersTurns = [[character_1, character_2], [character_2, character_1]];
    let logFightDamage = "";
    for (let index = 0; index < 2; index++) {
        const attacker = arrayCharactersTurns[index][0];
        const defender = arrayCharactersTurns[index][1];
        let dodged_attack = 100.0 * Math.random() < defender.dodge;
        if (dodged_attack) {
            logFightDamage += `${defender.characterName} avoided the attack from ${attacker.characterName}\n`;
        } else {
            let damageDone = Math.floor((0.5 + 0.5 * Math.random()) * (attacker.attack - defender.defense));
            if (damageDone < 0) {
                damageDone = 0;
            }
            if (damageDone > defender.health) {
                damageDone = defender.health;
            }
            defender.health = defender.health - damageDone;
            logFightDamage += `${attacker.characterName} does ${damageDone} damage to ${defender.characterName}\n`;
            if (defender.health <= 0) {
                defender.health = 0;
                logFightDamage += `${defender.characterName} was defeated\n`;
                break;
            }
        }
    }
    return logFightDamage;
}

// Simulate a fight battle, returns updated user, enemies, and a log
export function fightBattle (user, enemy, arrayEnemies) {
    let maxTurns = 20;
    let logs = [];

    while (user.health > 0 && enemy.health > 0 && maxTurns > 0) {
        const roundLog = fightDamage(user, enemy);
        logs.push(roundLog);
        logs.push(user.healthStatus());
        logs.push(enemy.healthStatus());

        if (user.health === 0) {
            logs.push("You have lost the game!");
            // User lost - clear saved data if you want
            break;
        }

        if (enemy.health === 0) {
            let droppedGold = Math.floor(Math.random() * (enemy.gold + 1));
            user.gold += droppedGold;
            user.experience += enemy.experience;
            logs.push(`Congratulations, you won the battle! You got ${droppedGold} gold.`);
            // Remove enemy from array
            const updatedEnemies = arrayEnemies.filter(e => e.id !== enemy.id);
            return { user, enemies: updatedEnemies, logs };
        }

        maxTurns--;
        if (maxTurns === 0 && enemy.health > 0) {
            logs.push("Could not win the battle within the turn limit.");
        }
    }

    // If we reach here, fight ended (either because user lost or turns ended)
    return { user, enemies: arrayEnemies, logs };
}

// Function to simulate searching for a new enemy (costs gold, adds enemy)
export async function searchEnemy (user, arrayEnemies) {
    if (user.gold >= 3 && arrayEnemies.length < 5) {
        const enemies = await getEnemies();
        const enemy = enemies[Math.floor(Math.random() * enemies.length)];
        const newEnemy = new Character(
            enemy.characterName, enemy.health, enemy.attack, enemy.defense, enemy.dodge, enemy.gold, enemy.experience
        );
        arrayEnemies.push(newEnemy);
        user.gold -= 3;
        return { user, enemies: arrayEnemies };
    } else {
        // Not enough gold or already have too many enemies
        return { user, enemies: arrayEnemies };
    }
}

// Function to buy an item from the shop
export function buyItem (user, shopItem) {
    if (user.gold >= shopItem.gold_cost) {
        if (shopItem.type === "Potion") {
            user.health += shopItem.health_recover;
        } else if (shopItem.type === "Weapon") {
            user.attack += shopItem.attack;
        }
        user.gold -= shopItem.gold_cost;
    }
    return user;
}
