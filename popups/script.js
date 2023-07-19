function displayHistory(historyItems) {
    var ul = document.getElementById("history-list");
    historyItems.slice(0, 5).forEach(function (item) {
        var historyEntryId = item.id;
        var url = item.url;
        var title = item.title;
        var lastVisitTime = item.lastVisitTime;
        var visitTimeAgo = getTimeAgo(lastVisitTime);

        var li = document.createElement("li");
        li.innerHTML =
            `
            <div class="item">
                <span class="title">
                    <a href="${url}" target="_blank">${title}</a>
                </span>
                <span class="time">
                    At ${new Date(item.lastVisitTime).toLocaleString()} (${visitTimeAgo})
                </span>
            </div>
            <div class="event" data-id="${historyEntryId}">
                <a class="icon-button-1" title="Access" href="${url}" target="_blank">
                    <i class="fas fa-link"></i>
                </a>
                <button class="icon-button" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`;
        ul.appendChild(li);
    });

    var qty = document.getElementById("qty");
    qty.innerText = "";
    qty.innerText = "Quantity: " + historyItems.length;
}

function getTimeAgo(timestamp) {
    var seconds = Math.floor((new Date() - timestamp) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }
    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
}

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("icon-button")) {
        var historyEntryId = event.target.parentNode.getAttribute("data-id");
        removeHistoryById(historyEntryId);
    }
});

function removeHistoryById(historyEntryId) {
    chrome.history.search({ text: "", maxResults: 0 }, function (results) {
        console.log(results);

        var historyEntry = results.find(entry => entry.id === historyEntryId);
        console.log(historyEntry);

        if (historyEntry) {
            // Call the deleteUrl function to remove the history entry
            chrome.history.deleteUrl({ url: historyEntry.url }, function () {
                toggleElement();

                setTimeout(function () {
                    var ul = document.getElementById("history-list");
                    ul.innerHTML = "";
                    getData();
                    toggleElement();
                }, 2000);
            });
        }
    });
}

function toggleElement() {
    var element = document.getElementById("loading");
    if (element.style.display === "none") {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  }

function getData() {
    chrome.history.search({ text: '', maxResults: 0 }, function (historyItems) {
        displayHistory(historyItems);
    });
}

getData();