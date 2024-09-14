const { select, input } = require('@inquirer/prompts')
const fs = require("fs").promisses

let mensagem = "Bem vindo!"

let metas

const carregarMetas = async() => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8"),
        metas = JSON.parse(dados)
    }
    catch (error)
    {
        metas = []
    }
}

const salvarMetas = async() => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async() => {
    if(meta.length = 0) {
        menssagem = "Nao existem metas!"
        return
    }
    const meta = await input({message: "Digite a meta:"})

    if(meta.length == 0) {
        mensagem = 'A meta nao pode ser vazia'
        return
    }

    metas.push({value: meta, checked: false})

    mensagem = "Meta cadastrada com sucesso"
}

const listarMetas = async () => {
    if(meta.length = 0) {
        menssagem = "Nao existem metas!"
        return
    }
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta,o espaço para marcar ou desmarcar e o enter para finalizar",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada"
        return
    }

    

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true      
    });

    menssagem = 'meta(s) concluida(s)'
}

const metasRealizadas = async () => {
    if(meta.length = 0) {
        menssagem = "Nao existem metas!"
        return
    }
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem ='Nao existe metas realizadas'
        return
    }

    await select({
        message: "Metas Realizadas" + realizadas.length,
        choices:[...realizadas]
    })
}

const metasAbertas = async () => {
    if(meta.length = 0) {
        menssagem = "Nao existem metas!"
        return
    }
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if(abertas.length == 0){
        mensagem = 'Nao existem metas abertas'
        return
    }

    await select({
        message: "Metas Abertas" + abertas.length,
        choices:[...abertas]
    })
}

const deletarMetas = async () => {
    if(meta.length = 0) {
        menssagem = "Nao existem metas!"
        return
    }
    const metasDesmarcardas = metas.map((meta) =>{
        return {value: meta.value, checked: false }
    })

    const itensADeletar = await checkbox({
        message: "Selecione um item para deletar",
        choices:[...metasDesmarcardas],
        instructions: false,
    })

    if(itensADeletar.length == 0) {
        mensagem = "Nenhum item foi selecionado para deletar"
        return
    }

    itensADeletar.forEach((item) => {
        metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = 'Metas deletadas com sucesso'
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    await carregarMetas()
   
    while(true){
        mostrarMensagem()
        await salvarMetas()
        
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
                    name: "metas abertas",
                    value: "abertas"
                },
                {
                    name: "deletar metas",
                    value: "deletar"
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
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até a proxima...")
                return
        }
    }
}

start()