import router from "../router"
import store from "../store"

const handleError = (error) => {
    //Setup Error Message
    let message = null
    if (typeof error !== 'undefined') {
        if (error.hasOwnProperty('message')) {
            message = error.message
        }
    }

    if (typeof error.response !== 'undefined') {

        //Setup Generic Response Messages
        if (error.response.status === 500) {
            message = 'Internal Server Error'
        } else if (error.response.status === 401) {
                        
            if (error.response.data.hasOwnProperty('error'))
                message = error.response.data.error
            else if (error.response.data.hasOwnProperty('message'))
                message = error.response.data.message

            store.dispatch("logout").then(() => { router.push({name: "login"})})
        } 

        //Try to Use the Response Message
        if (error.hasOwnProperty('response') && error.response.hasOwnProperty('data') && error.response.status !== 500) {
            if (error.response.data.hasOwnProperty('message') && error.response.data.message.length > 0) {
                message = error.response.data.message
            }
        }
    }

    return message
}



export { handleError }