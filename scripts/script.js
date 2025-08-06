class Form {
    constructor() {
        this.formDocument = document.querySelector('.form')
        this.formDocumentAll = document.querySelectorAll('.validate')
        this.validateClick()
    }

    validateClick() {
        this.formDocument.addEventListener('click', e => {
            e.preventDefault()
            this.handleSubmit()
        })
    }

    handleSubmit(e) {
        const validateProfile = this.validateProfile()
        const validatePassword = this.validatePassword()

        console.log(validateProfile)
        console.log(validatePassword)
    }

    validateProfile() {
        let valid = true
        
        for (let errors of document.querySelectorAll('.error-msg')) {
            console.log(errors)
            errors.remove()
        }

        for (let camp of this.formDocumentAll) {
            const label = camp.previousElementSibling;

            if (camp.value == "") this.createError(camp, `${label.innerText} is empty`)

            if (camp.classList.contains('cpf')) {
                if (this.validateCpf(camp) == false) this.createError(camp, `${label.innerText} invalid, or dont exist`)
            }

            if (camp.classList.contains('username')) {
                if (camp.value > 10) this.createError(camp, "username is too big ( min less than 10 )")
                if (camp.value < 5) this.createError(camp, "iusername is too small ( min is 5 )")
            }

        }
        return valid
    }

    validatePassword() {
        const password = document.querySelector(".password")
        const passwordRep = document.querySelector(".rpassword")

        if (password.value == passwordRep.value) {
            if (password.value < 10) this.createError(password, "Password is too small")
            return true
        } else {
            this.createError("password's dont match")
        }
    }

    validateCpf(camp) {
        const Cpf = new validatecpf(camp.value)
        const isCpf = Cpf.Validate()
        console.log(isCpf)
        return isCpf
    }

    createError(local, msg) {
        const li = document.createElement("li")
        li.innerHTML = msg
        li.classList.add("error-msg")
        local.insertAdjacentElement('afterend', li);
    }
    
}

const form = new Form()