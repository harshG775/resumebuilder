export async function to<T>(promise: Promise<T>): Promise<[Error | undefined, T | undefined]> {
    return promise
        .then((result) => {
            return [undefined, result] as [Error | undefined, T | undefined]
        })
        .catch((error) => {
            return [error instanceof Error ? error : new Error(String(error)), undefined]
        })
}
