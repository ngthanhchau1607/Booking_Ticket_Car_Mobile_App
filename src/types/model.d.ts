
export { };
declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IUserLogin {
        user: {
            id: string,
            name: string,
            email: string,
            password: string,
            numberPhone: string,
            avatar: any,
            type: boolean,
        },
        token: string

    }
}