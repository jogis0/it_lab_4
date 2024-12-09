function validatePositiveNumber(input) {
    const num = Number(input)
    return Number.isInteger(num) && num > 0
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form")
    const nameInput = document.getElementById("fname")
    const ageInput = document.getElementById("age")

    form.addEventListener("submit", (event) => {
        const ageValue = ageInput.value;
        const nameValue = nameInput.value

        // 1.a.
        if (nameValue.length === 0) {
            event.preventDefault()
            alert("Name can not be empty")
            nameInput.focus()
        }

        // 1.b.
        if (!validatePositiveNumber(ageValue)) {
            event.preventDefault()
            alert("Enter a valid positive integer for age")
            ageInput.focus()
        }
    });
});

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
            // TODO: Kazkodel nedeletina paragrafu
            $("#removeParagraphDiv > p").each(function () {
                if (this.value.includes($("#removeParagraphField").val())) {
                    $(this).remove()
                }
            })
        } else {
            alert("Enter a valid paragraph number")
        }
    })
})
