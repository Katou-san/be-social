
export interface reponseData_Type {
    statusCode: number
    message: string
    data: any
    error: any
    Oauth: boolean
}

type Props = {
    statusCode?: 200 | 400 | 404
    message?: string
    data?: any
    error?: any
    Oauth?: boolean
}

const responeData = ({ statusCode = 200, message = '', data = {}, error = {}, Oauth = true }: Props): reponseData_Type => {
    return {
        statusCode,
        message,
        error,
        data,
        Oauth
    }
}



export { responeData }

