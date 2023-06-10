import { reject } from "lodash";

class CommonUtils {
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }
    // static getBase64(file) {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const base64String = reader.result;
    //             resolve(base64String);
    //         };
    //         reader.onerror = error => reject(error);

    //         const blob = new Blob([file]);
    //         reader.readAsDataURL(blob);
    //     });
    // }

    // getBase64 = url => fetch(url)
    //     .then(response => response.blob())
    //     .then(blob => new Promise((resolve, reject) => {
    //         const reader = new FileReader()
    //         reader.onloadend = () => resolve(reader.result)
    //         reader.onerror = reject
    //         reader.readAsDataURL(blob)
    //     }))
}

export default CommonUtils;