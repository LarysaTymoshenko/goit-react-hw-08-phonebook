export const getUserName = state => state?.auth?.user?.name ?? null;

export const authUser = state => (state?.auth?.token ? true : false);

export const getToken = state => state?.auth?.token;
