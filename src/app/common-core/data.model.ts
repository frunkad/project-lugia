
export const random_id = function(len: number = 9) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
}
