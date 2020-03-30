export class ObjectUtil {
    static isNotNull(obj: Object) {
        return Object.keys(obj).length != 0;
    }
}
