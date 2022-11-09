const getFiles = async(req, res) => {
    res.send("Hello from home page " + req.userId);
}

module.exports = { getFiles }