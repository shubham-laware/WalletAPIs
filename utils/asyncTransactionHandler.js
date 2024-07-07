import mongoose from 'mongoose';

const AsyncTransactionHandler = (handler) => async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await handler(session, req, res);
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ error: error.message });
    } finally {
        session.endSession();
    }
};

export default AsyncTransactionHandler;