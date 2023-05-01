class ErrorManager{
    constructor(){
        this.possibleErrors = {
            'auth/wrong-password' : 'Senha incorreta.',
            'auth/user-not-found' : 'Email não cadastrado.',
            'auth/email-already-in-use' : 'Email já cadastrado.',
            'auth/weak-password' : 'A senha deve ter no mínimo 6 caracteres.',
            'auth/too-many-requests' : 'Seu email foi bloqueado por excesso de tentativas. Por favor espere alguns minutos e tente novamente.'

        }
    }

    Message(error){
        return this.possibleErrors[error]
    }
}

export default ErrorManager;