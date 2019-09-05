import {Message} from 'element-ui'

export default ({ $axios }) => {
    // console.dir($axios)
    $axios.onError(res => {
        const { message, statusCode } = res.response.data
        // console.log(res.response)
        if(statusCode === 400){
            Message.error(message)
        }
    })
}