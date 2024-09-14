const { select, input } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3l de agua por dia',
    checked: false,
}
let metas = [
    meta
]

const cadastrarMeta = async() => {
    const meta = await input({message: "Digite a meta:"})

    if(meta.length == 0) {
        console.log('A meta nao pode ser vazia')
        return
    }

    metas.push({value: meta, checked: false})
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta,o espaço para marcar ou desmarcar e o enter para finalizar",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada")
        return
    }

    

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true      
    });

    console.log('meta(s) concluida(s)')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log('Nao existe metas realizadas')
        return
    }

    await select({
        message: "Metas Realizadas",
        choices:[...realizadas]
    })
}

const start = async () => {

    while(true){
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "sair":
                console.log("Até a proxima...")
                return
        }
    }
}

start()