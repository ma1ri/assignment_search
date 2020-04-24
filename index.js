class Commit {
    constructor(url) {
        this.url = url;
    }

    async getFilteredCommits(message) {
        let responce = await fetch(this.url);
        let commits = await responce.json();
        let filteredCommits = commits.filter(elem => elem.commit.message.indexOf(message, 0) > -1);
        let messages = filteredCommits.map(x => x.commit.message)
        return messages;
    }


    showMessages(messages) {
        // if there are old messages remove them
        let currOl = document.getElementById("my-ol");
        if (currOl) {
            document.body.removeChild(currOl);
        }
        //if there are any messages to display, add to dom
        if (messages.length > 0) {
            let lis = messages.map(elem => {
                let li = document.createElement('li');
                li.innerHTML = elem;
                return li;
            })
            let ol = document.createElement("ol");
            ol.id = "my-ol";
            ol.innerText = "Messages:";
            document.body.appendChild(ol);
            for (const curr of lis) {
                ol.appendChild(curr);
            }
        } else { //display text that there were no messages
            let text = document.createElement('div');
            text.id = "my-ol";
            text.innerHTML = "Couldn't find any messages"
            document.body.appendChild(text);
        }

    }
}


async function search() {
    let word = document.getElementById("fname").value;
    if (word.length > 0) {
        let commit = new Commit("https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits");
        let messages = await commit.getFilteredCommits(word);
        commit.showMessages(messages);
    }
}

