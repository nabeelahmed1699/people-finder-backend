
function handleErr(err) {
    if (err) return {
        message: "Failed",
        err
    }
}

module.exports =handleErr;