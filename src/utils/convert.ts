export const convertNullData = (data = {}, deny = []) => {
    const Array_keys = Object.keys(data);
    let result: any;
    Array_keys.map((key) => {
        if (deny.indexOf(key) === -1) {
            if (!!data[key]) {
                result[key] = data[key];
            }
        }
    });
    return result ?? {};
};