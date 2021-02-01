//import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
//import "sweetalert2/dist/sweetalert2.min.css";

//Vue.use(VueSweetalert2);
const App = {
  data() {
    return {
      grupos: [
        {
          nome: "",
          grupo: "Formação Acadêmica e Complementar",
          grupoId: 1,
          itemsGrupo: [
            {
              descricao:
                "Bolsista durante graduação (PIBIC, PIBIT, PIBEAC, IC)",
              pontuacao: "2 pontos/ semestre",
              peso: 2,
              maximo: 14,
              quantidade: 0,
              totalItem: 0,
            },
            {
              descricao: "Monitoria em disciplinas de Graduação",
              pontuacao: "2,0 pontos/ semestre",
              peso: 2.0,
              maximo: 12,
              quantidade: 0,
              totalItem: 0,
            },
            {
              descricao: "Participação em eventos científicos",
              pontuacao: "1,0 ponto/ evento",
              peso: 1,
              maximo: 10,
              quantidade: 0,
              totalItem: 0,
            },
            {
              descricao:
                "Participação em projetos de pesquisa, ensino e extensão (como voluntário/ colaborador)",
              pontuacao: "1,5 pontos/ semestre",
              peso: 1.5,
              maximo: 9,
              quantidade: 0,
              totalItem: 0,
            },
            {
              descricao: "Curso ministrado  entre 8 a 40 horas",
              pontuacao: "2,0 ponto/ curso",
              peso: 2,
              maximo: 10,
              quantidade: 0,
              totalItem: 0,
            },
            {
              descricao:
                "Cursos realizados na área do curso ou em áreas correlatas",
              pontuacao: "0,5 ponto/ curso",
              peso: 0.5,
              maximo: 5,
              quantidade: 0,
              totalItem: 0,
            },
            {
              descricao:
                "Trabalho voluntário na área do curso ou áreas correlatas",
              pontuacao: "0,5 ponto/ semestre",
              peso: 0.5,
              maximo: 2,
              quantidade: 0,
              totalItem: 0,
            },
          ],
        },
        {
          grupo: "Produção Científica",
          grupoId: 2,
          itemsGrupo: [
            {
              descricao: "Capítulo de Livro com até 20 páginas, com ISBN  ",
              pontuacao: "1 ponto/ semestre",
              peso: 1,
              maximo: 5,
              quantidade: 0,
              totalItem: 0,
            },
            {
              descricao:
                "Artigo publicado em periódico  - Ciências Agrárias e correlatas",
              pontuacao: "2,0 pontos/ artigo",
              peso: 2,
              maximo: 10,
              quantidade: 0,
              totalItem: 0,
            },
            {
              descricao:
                "Texto completo ou Resumo expandido publicado em Anais Internacional, Nacional, Regional (mínimo de 4 páginas)",
              pontuacao: "0,5 ponto/ texto",
              peso: 0.5,
              maximo: 5,
              quantidade: 0,
              totalItem: 0,
            },
            {
              descricao:
                "Resumo simples publicado em evento Internacional, Evento Nacional, Regional, Local ",
              pontuacao: "0,2 ponto/ resumo",
              peso: 0.2,
              maximo: 3,
              quantidade: 0,
              totalItem: 0,
            },
            {
              descricao: "Apresentação de trabalhos científicos em eventos",
              pontuacao: "0,2 ponto/ trabalho apresentado",
              peso: 0.2,
              maximo: 5,
              quantidade: 0,
              totalItem: 0,
            },
            {
              descricao:
                "Publicação de capitulo de livro, ou artigos científicos publicados em anais de eventos",
              pontuacao: "1,0 ponto/ publicação",
              peso: 1,
              maximo: 10,
              quantidade: 0,
              totalItem: 0,
            },
          ],
        },
      ],
    };
  },
  methods: {
    getTotal() {
      let totaisItems = Array();
      this.grupos.map((item) => {
        item.itemsGrupo.forEach((el) => {
          totaisItems.push(el.totalItem);
        });
      });
      return totaisItems
        .reduce((acc, actual, index, array) => acc + actual)
        .toFixed(1);
    },
    imprimir() {
      if (this.grupos[0].nome.length <= 5) {
        Swal.fire(
          "Qual o seu nome?",
          "Você precisa informar um nome válido para gerar o documento",
          "warning"
        ).then(() => {
          window.scroll({ top: 0, behavior: "smooth" });
          setTimeout(function () {
            document.getElementById("nome").focus();
          }, 500);
        });
        return;
      }
      //this.$swal("Hello Vue world!!!");
      this.toast();
    },
    toast() {
      Swal.fire({
        title: "Quer gerar o PDF agora?",
        html: `Você tem certeza de que quer gerar o pdf com essas informações?<br>
          Nome: <b> ${
            this.grupos[0].nome
          } </b> e nota: <b>${this.getTotal()}</b>`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, quero gerar o PDF!",
        cancelButtonText: "Não, quero corrigir!",
      }).then((result) => {
        if (result.isConfirmed) {
          let form = document.getElementById("dados");
          form.submit();
          const Toast = Swal.mixin({
            toast: false,
            position: "center",
            showConfirmButton: false,
            timer: 3000,
            //timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire(
            "Seu arquivo está sendo gerado!",
            "Em instantes será baixado para o seu computador.",
            "success"
          );
        }
      });
    },
  },
};

Vue.createApp(App).mount("#app");
