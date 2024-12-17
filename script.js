function validatePositiveNumber(input) {
    const num = Number(input)
    return Number.isInteger(num) && num > 0
}

function postItem(name, age) {
    fetch("https://jsonblob.com/api/jsonBlob", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            age: age
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => {
            if (response.ok) {
                let location = response.headers.get("Location");
                console.log("Blob successfully created at:", location);
            } else {
                console.error("Failed to create the blob. Status:", response.status);
            }
        })
        .catch(error => console.error("Error during fetch:", error));
}

async function getItem(id) {
    try {
        let response = await fetch(`https://jsonblob.com/api/jsonBlob/${id}`, {
            method: "GET"
        });

        if (response.ok) {
            let res = await response.json();
            console.log("Successfully fetched blob: ", res)
            return res
        } else {
            console.error("Failed to get the blob. Status:", response.status);
            return null;
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        return null;
    }
}

$(document).ready(function () {
    // 2
    $("#fname").on("input", function () {
        if ($(this).val() === "admin") {
            $("#greetings").css({"display": "contents"})
        } else {
            $("#greetings").css({"display": "none"})
        }
    })
    // 3.a.
    $("#changeTextButton").click(function () {
        $("#paragraphToReplace").text($("#changeTextField").val())
    })
    // 3.b.
    $("#changeStyleButton").click(function () {
        let randomColorChange = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
        $("#changeStyleDiv").css("background-color", randomColorChange)
    })
    // 3.c.
    $("#removeParagraphButton").click(function () {
        let num = Number($("#removeParagraphField").val())
        if (Number.isInteger(num) && num > 0 && num <= 6) {
            $(`#removeParagraphDiv > p:nth-child(${num})`).remove()
        } else {
            alert("Enter a valid paragraph number")
        }
    })
    // 3.d.
    $("#addParagraphButton").click(function () {
        let inputText = $("#addParagraphField").val()
        let par = $("<p></p>").text(inputText)
        $("#addParagraph").append(par)
    })
    // 4.a.
    $("#submitApiButton").click(function () {
        let name = $("#fname").val()
        let age = $("#age").val()
        // 1.a.
        if (name.length === 0) {
            alert("Name can not be empty")
            return
        }

        // 1.b.
        if (!validatePositiveNumber(age)) {
            alert("Enter a valid positive integer for age")
            return
        }
        postItem(name, age)
    })
    // 4.b. ir 4.c.
    $("#getApiButton").click(async function () {
        let blobId = $("#getIdField").val()
        try {
            let json = await getItem(blobId);
            if (json) {
                $("#getItemTable tr:last").after(`<tr><td>${json.name}</td><td>${json.age}</td></tr>`);
            } else {
                console.error("Failed to fetch data or invalid response.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    })
})
