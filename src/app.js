document.addEventListener('DOMContentLoaded', () => {
  const formMachineOne = document.getElementById('calc-form-machine-one');
  const formMachineTwo = document.getElementById('calc-form-machine-two');
  const outputContainer = document.getElementById('output');
  const copyButton = document.getElementById('copy-btn');

  const tabBtn1 = document.getElementById("tab-btn-1");
  const tabBtn2 = document.getElementById("tab-btn-2");
  const tab1 = document.getElementById("tab-1");
  const tab2 = document.getElementById("tab-2");
  switchTab(tab1, tab2, tabBtn1, tabBtn2);

  function switchTab(activeTab, inactiveTab, activeBtn, inactiveBtn) {
    activeTab.classList.remove("hidden");
    inactiveTab.classList.add("hidden");

    activeBtn.classList.add("bg-zinc-600");
    inactiveBtn.classList.remove("bg-zinc-600");
  }

  tabBtn1.addEventListener("click", () => {
    switchTab(tab1, tab2, tabBtn1, tabBtn2);
  });

  tabBtn2.addEventListener("click", () => {
    switchTab(tab2, tab1, tabBtn2, tabBtn1);
  });

  formMachineOne.addEventListener('submit', (event) => {
    event.preventDefault();

    const beltLength = parseFloat(formMachineOne.length.value);
    const perforationPitch = parseFloat(formMachineOne.pitch.value); // C to C
    const angleValue = parseFloat(formMachineOne.teethType.value);
    const gcodeCommand = formMachineOne.gcode.value;
    const prefixMachineOne = formMachineOne.prefixMachineOne.value;

    const angularStep = perforationPitch * angleValue;
    const totalAngle = (beltLength / perforationPitch) * angularStep;

    const lines = [];

    for (let angle = angularStep; angle <= totalAngle; angle += angularStep) {
      lines.push(`${gcodeCommand}<br />${prefixMachineOne}${angle}`);
    }

    outputContainer.innerHTML = lines.map(line => `<div>${line}</div>`).join('');
  });

  formMachineTwo.addEventListener('submit', (event) => {
    event.preventDefault();

    const beltLength = parseFloat(formMachineTwo.lengthMachineTwo.value);
    const angleMaxValue = parseFloat(formMachineTwo.angleMaxValue.value);
    const perforationPitch = parseFloat(formMachineTwo.pitchMachineTwo.value);
    const gcodeCommand = formMachineTwo.gcodeMachineTwo.value;
    const prefix = formMachineTwo.prefixMachineTwo.value;

    const angularStep = angleMaxValue / (beltLength / perforationPitch);

    const lines = [];

    for (let angle = angularStep; angle <= angleMaxValue; angle += angularStep) {
      lines.push(`${gcodeCommand}<br />${prefix}${angle}`);
    }

    outputContainer.innerHTML = lines.map(line => `<div>${line}</div>`).join('');
  });

  copyButton.addEventListener('click', () => {
    const outputText = outputContainer.innerText;
    if (!outputText.trim()) return;

    navigator.clipboard.writeText(outputText)
      .then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => copyButton.textContent = 'Copy to Clipboard', 1500);
      })
      .catch((err) => {
        alert('Failed to copy text.');
        console.error(err);
      });
  });
});


