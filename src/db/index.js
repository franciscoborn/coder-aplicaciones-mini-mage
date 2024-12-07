import * as SQLite from 'expo-sqlite';

const dbPromise = SQLite.openDatabaseAsync("mini-mage.db");

export const createSessionsTable = async () => {
    const db = await dbPromise;
    return new Promise((resolve, reject) => {
        const query = `
            CREATE TABLE IF NOT EXISTS sessions (
                localId TEXT PRIMARY KEY NOT NULL,
                email TEXT NOT NULL,
                token TEXT NOT NULL,
                userName TEXT NOT NULL
            )
    `;
        db.runAsync((tx) => {
            tx.executeSqlAsync(query)
                .then(resolve)
                .catch((error) => {
                    console.error("Error creating sessions table:", error);
                    reject(error);
                });
        });
    });
};

// Function to insert a session into the table
export const insertSession = async ({ email, localId, token, userName }) => {
    const db = await dbPromise;
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO sessions (email, localId, token, userName)
            VALUES (?, ?, ?, ?)
    `;
        db.runAsync((tx) => {
            tx.executeSqlAsync(query, [email, localId, token, userName])
                .then(resolve)
                .catch((error) => {
                    console.error("Error inserting session:", error);
                    reject(error);
                });
        });
    });
};

// Function to fetch all sessions
export const fetchSession = async () => {
    const db = await dbPromise;
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM sessions`;
        db.runAsync((tx) => {
            tx.executeSqlAsync(query)
                .then((result) => resolve(result.rows._array))
                .catch((error) => {
                    console.error("Error fetching sessions:", error);
                    reject(error);
                });
        });
    });
};

// Function to clear all sessions
export const clearSessions = async () => {
    const db = await dbPromise;
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM sessions`;
        db.runAsync((tx) => {
            tx.executeSqlAsync(query)
                .then(resolve)
                .catch((error) => {
                    console.error("Error clearing sessions:", error);
                    reject(error);
                });
        });
    });
};
