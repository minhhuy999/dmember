import realmHS from "./realmHistoryS";

export const getListTasks = () => {
    const tasks = realmHS.objects('HistorySreach');
    return Promise.resolve(Array.from(tasks));
}

export const loadAddSPData = () => {
    const products = realmHS.objects('AddProduct');
    return Promise.resolve(Array.from(products));
};

export const loadAddMember = () => {
    const member = realmHS.objects('AddMember');
    return Promise.resolve(Array.from(member));
};


export const addTask = (name: string) => {
    const data = {
        id: new Date().getTime(),
        name,
    }
    return new Promise((resolve: any, reject) => {
        realmHS.write(() => {
            realmHS.create('HistorySreach', data);
            resolve();
        });
    })
}

export const addSPStore = (id: string, soluong: number) => {
    const data = {
        id,
        soluong,
    };

    return new Promise((resolve: any, reject: any) => {
        realmHS.write(() => {
            realmHS.create('AddProduct', data);
            resolve();
        });
    });
};

export const addMember = (id: string) => {
    const data = {
        id,
    };

    return new Promise((resolve: any, reject: any) => {
        realmHS.write(() => {
            realmHS.create('AddMember', data);
            resolve();
        });
    });
};

export const removeTask = (id: any) => {
    const HistoryToRemove = realmHS.objects('HistorySreach').filtered(`id == '${id}'`)[0];
    return new Promise((resolve: any, reject) => {
        realmHS.write(() => {
            realmHS.delete(HistoryToRemove);
            resolve();
        });
    })
}

export const removeSP = (id: string) => {
    const productToRemove = realmHS.objects('AddProduct').filtered(`id == '${id}'`)[0];
    return new Promise((resolve: any, reject) => {
        realmHS.write(() => {
            realmHS.delete(productToRemove);
            resolve();
        });
    });
};

export const updateSLSP = (id: string, soluong: number) => {
    const productToUpdate = realmHS.objects('AddProduct').filtered(`id == '${id}'`)[0];

    if (!productToUpdate) {
        console.error('Task not found');
        return Promise.reject('Task not found');
    }

    return new Promise((resolve:any, reject) => {
        realmHS.write(() => {
            productToUpdate.soluong = soluong;
            resolve(); 
        });
    })
};

export const removeMB = (id: string) => {
    const memberToRemove = realmHS.objects('AddMember').filtered(`id == '${id}'`)[0];
    return new Promise((resolve: any, reject) => {
        realmHS.write(() => {
            realmHS.delete(memberToRemove);
            resolve();
        });
    });
};

