const { select } = require('@inquirer/prompts')

const cadastrarMeta = async() => {}

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
                console.log("vamos listar")
                break
            case "sair":
                console.log("Até a proxima...")
                return
        }
    }
}

start()