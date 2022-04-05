export class Todo {

    title: string;
    discription: string;

    constructor(obj?: any) {

        this.title = obj ? obj.title : '';
        this.discription = obj ? obj.discription : '';
    }

    public toJson() {
        return {
            title: this.title,
            discription: this.discription,
        }
    }
}