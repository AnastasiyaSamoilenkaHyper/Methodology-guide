let criteria = [
  "Project size (small: 1 big: 10)",
  "Time to complete (short: 1, long: 10)",
  "Clarity of objective and solution (not clear: 1, very clear: 10)",
  "How much time are you ready to spend on the project planning? (short: 1, long: 10)",
  "Ready to be flexible in all aspects (not ready: 1, ready: 10)",
  "Possibility of change in the project from the client side (unlikely changes: 1, likely changes: 10)",
  "Team size (small: 1 big: 10)",
  "Strict requirements for formal approvals (non-strict: 1, strict: 10)",
  "User engagement (small: 1, big: 10)",
];

let methodologies = {
  Waterfall: [3, 3, 9, 10, 1, 2, 5, 10, 2],
  DevOps: [5, 3, 4, 4, 6, 6, 9, 5, 8],
  "Rapid application development": [5, 2, 2, 1, 9, 10, 5, 4, 10],
  "Agile Scrum": [5, 7, 3, 7, 10, 9, 5, 2, 8],
  "Agile Kanban": [5, 5, 3, 7, 9, 9, 5, 2, 8],
  "Agile Lean": [4, 2, 1, 3, 10, 9, 5, 2, 7],
  "Agile Extreme Programming": [5, 2, 2, 3, 10, 10, 5, 2, 10],
  "Agile Crystal": [4, 1, 3, 7, 9, 9, 7, 1, 6],
};

function createInputs() {
  let wrapper = document.querySelector("#input-wrapper");

  for (i in criteria) {
    let content = document.createElement("div");
    let infoText = document.createElement("p");
    let input = document.createElement("input");
    content.append(infoText);
    content.append(input);
    input.id = "id" + i;
    infoText.innerHTML = criteria[i];
    wrapper.append(content);
  }
}

function selectMethodology() {
  let project = readProjectCriteria();

  // calculate average differences from all methodologies
  let average_differences = {};
  for (met_name in methodologies) {
    average_differences[met_name] = f(project, methodologies[met_name]);
  }

  let sorted = sortMethodologies(average_differences);

  showResults(sorted);
}

function readProjectCriteria() {
  let project = [];
  for (i in criteria) {
    let val = document.querySelector("#id" + i).value;
    if (val) {
      project.push(parseFloat(val));
    } else {
      project.push(0);
    }
  }
  return project;
}

function f(p, m) {
  let diff = 0;
  for (j in m) {
    diff += (p[j] - m[j]) ** 2;
  }
  return Math.sqrt(diff / parseFloat(p.length));
}

function sortMethodologies(diffs) {
  let sorted = [];
  for (let key in diffs) {
    sorted.push([key, diffs[key]]);
  }

  sorted.sort(function (a, b) {
    return a[1] - b[1];
  });

  return sorted;
}

function showResults(sorted_diffs) {
  let resultWrapper = document.querySelector("#results-wrapper");
  resultWrapper.innerHTML = "";
  for (i in sorted_diffs) {
    resultWrapper.innerHTML += `<p>${sorted_diffs[i][0]} (${Number(
      sorted_diffs[i][1].toFixed(1)
    )})</p>`;
  }
}
