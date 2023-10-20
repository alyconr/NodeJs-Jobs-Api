const register = async (req, res) => {
    res.send('Register User')
}


const login = async (req, res) => {
    res.send('login User')
}


module.exports = {
    register,
    login
}