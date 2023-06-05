import { createStore } from 'redux'
console.log('Store App is running')

const subcategoryReducerDefaultState =[];

const subcategoryReducer = (state = subcategoryReducerDefaultState, action) => {
    switch (action.type) {
        case  'SWITCH_TO_CITIZEN':
            return ['Population','Age','Sex'];
        case 'SWITCH_TO_ELECTRICITY':
            return ['Consumption','Produce','Facility'];
        case  'SWITCH_TO_WATER':
            return ['Facility','Consumption','Produce'];
        defualt:
            return state   ; 
    }  
}

const switchToCitizen = () => ({
    type: 'SWITCH_TO_CITIZEN'
})

const switchToElectricity = () => ({
    type: 'SWITCH_TO_ELECTRICITY'
})

const switchToWater = () => ({
    type: 'SWITCH_TO_WATER'
})

const store = createStore(subcategoryReducer);
store.dispatch(switchToWater())

store.subscribe(()=> {
    console.log(store.getState())
})
console.log(store.getState())




