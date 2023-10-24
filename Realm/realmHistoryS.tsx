import Realm from 'realm';

const TaskSchema = {
    name: 'HistorySreach',
    primaryKey: 'id', 
    properties: {
        id:'int',
        name: 'string',
    },
};

const TaskSP = {
    name: 'AddProduct',
    properties: {
        id:'string',
        soluong:'int',
        price:'int',
    },
};


const TaskDpoint = {
    name: 'AddItemDpoint',
    properties: {
        id:'string',
        soluong:'int',
        point:'int',
    },
};

const TaskMember = {
    name: 'AddMember',
    properties: {
        id:'string',
    },
};

const realmHS = new Realm({ schema: [TaskSchema,TaskSP,TaskDpoint,TaskMember] });

export default realmHS;
