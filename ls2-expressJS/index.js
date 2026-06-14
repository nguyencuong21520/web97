import express from 'express';

const app = express()
//middleware
app.use(express.json())

app.get('/', (req, res) => {
    //logic
    res.status(200).json({
        data: "alo alo",
        status: true
    })
})

app.get("/student/:id", (req, res) => {
    const studentId = req.params.id
    //logic 
    res.status(404).send(`Đây là student infor có id là ${studentId}`)
})

app.get("/student", (req, res) => {
    const filterValue = req.query
    console.log("filterValue", filterValue)

    //login
    res.send(`Student list with filter ${JSON.stringify(filterValue)}`)
})

app.post("/user", (req, res) => {

    const userInfo = req.body
    console.log("userInfo", userInfo)
    //logic

    res.status(201).send(`Register Success ${JSON.stringify(userInfo)}`)
})

app.put("/student/:id", (req, res) => {
    const studentId = req.params.id
    const updateField = req.body
    //logic
    res.send(`Update student has id ${studentId} with new info ${JSON.stringify(updateField)}`)
})

app.delete("/student/:id", (req, res) => {
    const studentId = req.params.id
    //logic

    res.send(`Delete student has id ${studentId}`)
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})
