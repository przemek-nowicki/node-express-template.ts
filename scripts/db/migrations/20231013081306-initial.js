export const up = async (db, client) => {
    // Add migration
    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            await db.collection('users').insertOne({ email: 'john.doe@example.com', name: 'John Doe' });
            await db.collection('users').insertOne({ email: 'jahne.doe@example.com', name: 'Jahne Doe' });
        });
    } finally {
      await session.endSession();
    }
};

export const down = async (db, client) => {
    // Rollback migration
    const session = client.startSession();
    try {
        await session.withTransaction(async () => {
            await db.collection('users').deleteOne({ email: 'john.doe@example.com' });
            await db.collection('users').deleteOne({ email: 'jahne.doe@example.com' });
        });
    } finally {
      await session.endSession();
    }
};
