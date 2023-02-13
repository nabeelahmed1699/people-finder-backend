function handleSuccess(data) {
    if (data) return {
        message: "Success",
        doc: data
    }
}

module.exports=handleSuccess;