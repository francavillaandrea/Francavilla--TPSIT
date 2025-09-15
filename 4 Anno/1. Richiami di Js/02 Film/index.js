"use strict"

const films = [
    // Id, Title, Favorite, Watch date, Rating (0-5)
    [1, "Pulp Fiction", true, "10-03-2024", 5],
    [2, "21 Grammi", true, "17-03-2024", 3],
    [3, "Star Wars", false, "15-03-2024", 1],
    [4, "Matrix", false, "01-01-2023", 4],
    [5, "Shrek", false, "21-03-2024", 2],
    [6, "Kill Bill Vol. 1", true, "22-04-2024", 5],
    [7, "Inception", true, "18-04-2024", 5]
];

const tBody = document.getElementsByTagName("tbody")[0]

visualizza()

function visualizza()
{
    tBody.innerHTML = ""
    for(let i = 0; i < films.length;i++)
    {
        let tr = document.createElement("tr")
        tBody.appendChild(tr)

        for(let j = 0; j < films[i].length;j++)
        {
            let td = document.createElement("td")
            tr.appendChild(td)
            if(j == 2)
            {
                let chk = document.createElement("input")
                chk.type = "checkbox"
                chk.disabled = true
                chk.checked = films[i][j]
                td.appendChild(chk)
            }
            else if(j == 4)
            {
                
            }
            else
            {
                td.textContent = films[i][j]
            }
        }

    }
}
