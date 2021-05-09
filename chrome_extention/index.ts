const main = () => {
  const examples: string[] = getExamples()
  const text: string = createText(examples)
  createElement(text)
}

const getExamples = (): string[] => {
  const examples: string[] = []
  const doc = document.getElementsByClassName('lang-ja')[0]
  let i = 0
  while(true) {
    const example = doc.querySelector(`#pre-sample${i}`)
    const exampleText = example?.textContent
    if(!exampleText) break
    examples.push(exampleText)
    i++
  }
  return examples
}

const createText = (examples: string[]): string => {
  let text: string = ""
  for(let i: number =0; i < examples.length; i += 2){
    text += `'${examples[i]}': '${examples[i+1]}',\n`
  }
  return text.slice(0, -2) + '\n\n'
}

const createElement = (text: string) => {
  const part: string = `<div class="part">
    <section>
      <h3>
        テスト用コード
        <span 
          class="btn btn-default btn-sm btn-copy"
          tabindex="0"
          id="sample-test-copy"
        >Copy</span>
      </h3>
      <pre>${text.slice(0, -2)}</pre>
    </section>
  </div>`
  const span = document.getElementsByClassName('lang-ja')[0]
  span.insertAdjacentHTML('beforeend', part)
  const copyButton = document.getElementById('sample-test-copy') as HTMLElement
  copyButton.addEventListener('click',()=>{
    copyText(text)
  })
};

const copyText = (text: string) => {
  const textarea = document.createElement("textarea")
  textarea.textContent = text
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  const copyButton = document.getElementById('sample-test-copy') as HTMLElement
  copyButton.textContent = 'Copied!'
}

main()
