export class Todo {

    title: string;
    discription: string;
    date:number;
    found:boolean;

    constructor(obj?: any) {

        this.title = obj ? obj.title : '';
        this.discription = obj ? obj.discription : '';
        this.date = obj ? obj.date : '';
        this.found = obj ? obj.found:false;
    }

    public toJson() {
        return {
            title: this.title,
            discription: this.discription,
            date:this.date,
            found:this.found
        }
    }
}