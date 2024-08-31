import bcrypt from 'bcrypt';
class cryptoHelper {
    static hashText = async ({text, saltRounds = 10}: { text: string, saltRounds?: number }) => {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedText = await bcrypt.hash(text, salt);
        return hashedText;
    }

    static verifyHash = async ({text, hash}: { text: string, hash: string }) => {
        const isValid = await bcrypt.compare(text, hash);
        return isValid;
    }
}

export default cryptoHelper;