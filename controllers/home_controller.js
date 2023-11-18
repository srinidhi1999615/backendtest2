

module.exports.home = async function (req, res) {
    try {
       
        return res.render('home', {
            title: "Codeial | Home"
            
        });
    } catch (error) {
        console.log('An error occurred:', error);
        return res.status(500).send('An error occurred'); // You can customize the error response as needed.
    }
};


// module.exports.actionName = function(req, res){}