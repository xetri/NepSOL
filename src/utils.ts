export const getIdFromMail = (mail: string) => mail.split("@")[0] as string;

export type UnwrapResult<T> = [T, null] | [null, any];

export async function Unwrap<T>(promise: Promise<T>): Promise<UnwrapResult<T>> {
    try {
        const data = await promise;
        return [data, null] as [T, null];
    } catch(e) {
        return [null, e] as [null, any];
    }
}