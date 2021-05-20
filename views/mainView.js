class MainView {
    send(response, result) {
        response.send(result);
    }
}

module.exports = new MainView();