const logInfo = (req, res, next) => {
    console.log("req info:", req.url)
    next()
}

const loginValidation = (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing email or password' })
    }

    next()
}

export { logInfo, loginValidation }
