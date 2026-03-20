import { Link } from "react-router-dom";
import { useState, useRef} from "react";

// Hooks
import { useProdutos } from "../hooks/useProdutos";
import { useAuth } from "../context/AuthContext";

// Componenetes
import Footer from "../componentes/Footer";

// Imagens card
import animeLogo from "../assets/img/anime-logo-2.jpg";
import nextNextIcon from "../assets/img/down.png";
import MotionGrafhic from "../assets/img/motion-graphic.png";
import actionFigure from "../assets/img/action-figure.png";
import Heart from "../assets/img/Heart.png";

//Icones 
import archievement from "../assets/img/achievement.png";

function Home() {

    // Dados do usuário e a função de logout do contexto
    const { logado, usuario, logout } = useAuth();


    // Listar produtos
    const { produtos } = useProdutos(); 

    // Variável de estado para controlar a visibilidade das seções
    const [ isCardsVisible, setIsCardsVisible ] = useState(false);
    const [ isProductExampleVisible, setProductExampleVisible ] = useState(false);

    // Váriavel de estado para controlar a visibilidade dos icones
    const [ isOneArrowVisible, setOneArrowVisible ] = useState(true);
    const [ isTwoArrowVisible, setTwoArrowVisible ] = useState(false);

    const [ isTitleVisible, setTitleVisible ] = useState(false);

    // Referência para as seções
    const firstSectionRef = useRef<HTMLDivElement>(null);
    const cardsSectionRef = useRef<HTMLDivElement>(null);
    const exampleSectionRef = useRef<HTMLDivElement>(null);

    // Funções para alternar a visibilidade
    const toggleCardsVisibility = () => {
        const nextState = !isCardsVisible;
        setIsCardsVisible(nextState);

        // NextState true: mostra a seção de cards
        if(nextState){
            // Torna a SEGUNDA flecha visível
            setTwoArrowVisible(true); 

            // Rola para a seção de cards
            setTimeout(() => {
                cardsSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50); 
        } else{
            // Deixa invisivel a seção e o icone
            setTwoArrowVisible(false);

            setTimeout(() => {
                firstSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }, 50); 
        }
    }

    const toggleExampleVisibility = () => {
        const nextState = !isProductExampleVisible;
        setProductExampleVisible(nextState);

        if(nextState){
            // Esconde a seção anterior e o icone
            setOneArrowVisible(false);
            setIsCardsVisible(false);

            // Deixa o titulo da seção visível
            setTitleVisible(true);

            setTimeout(() => {
                exampleSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50);
        }else if(!nextState){
            // Voltar a deixar visivel a seção e o icone
            setOneArrowVisible(true);
            setIsCardsVisible(true);
        }
    }

    const cardData = [
        {
            id: 1,
            img: archievement,
            descriptionn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: 2,
            img: MotionGrafhic,
            descriptionn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }, 
        {
            id: 3,
            img: actionFigure,
            descriptionn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: 4,
            img: Heart,
            descriptionn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
    ];

    const produtosDestaque = produtos
    .filter(p => p.destaque)
    .slice(0, 4);

    return(
        <>
            <section className="home">
                <header className="header-home">
                    {/* Lógica condicional do Header*/}
                    {logado ? (
                        <div className="user-info-header">
                            <span className="welcome-text">Olá, {usuario?.nome}</span>
                            <button 
                                onClick={logout}
                                className="header-home__button logout"
                            > 
                                Sair 
                            </button>
                        </div>
                    ) : (
                        <Link to={"/entrar"}>
                            <button className="header-home__button"> Login </button>
                        </Link>
                    )}
                </header>
                <div  ref={firstSectionRef} className="home__initial-section">
                    <div className="initial-section__title">
                        <h1 className="title">Animes Actions.F</h1>
                        <h4 className="sub-title">Aqui você encontra tudo do mundo dos animes!</h4>
                        <Link to={"/produtos"}>
                           <button className="initial-section__button">Ver Mais</button> 
                        </Link>
                    </div>
                    <img 
                        src={animeLogo} 
                        alt="Logo inicial" 
                        className="img-home"
                    />
                </div>

                {/* Adicionando evento onClick e a classe condicional */}
                {isOneArrowVisible && (
                    <div className={`next-page-button-section ${isCardsVisible ? 'rotated' : ''}`}
                    onClick={toggleCardsVisibility}>

                        <img src={nextNextIcon} className="next-page-icon" alt="Seta para proxima página" />
                    
                    </div>
                )}
                <div ref={cardsSectionRef} className={`home__apresentations-cards ${isCardsVisible ? 'visible' : 'hidden'}`}>
                    <div className="apresentation-cards__container">
                        {/* Mapeia e renderiza todos os cards */}
                        { cardData.map((cards) => (
                            <div key={cards.id} className="a-cards">
                                <img src={cards.img} alt="Cards da seção home" />
                                <p className="apresentions-cards__description">{cards.descriptionn}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {isTwoArrowVisible && (
                    <div className={`next-page-button-section ${isProductExampleVisible ? 'rotated' : ''}`}
                    onClick={toggleExampleVisibility}> 
                        <img src={nextNextIcon} className="next-page-icon" alt="Seta para a proxima seção" />
                    </div>
                )}

                <div ref={exampleSectionRef} className={`most-purchased-section ${isProductExampleVisible ? 'visible' : 'hidden'}`}>
                    <h2 className={`most-purchased-title ${isTitleVisible}`}>Actions em Destaque</h2>
                    <div className="most-purchased-section__container">
                        {produtosDestaque.map((p) => (
                            <div key={p.id} className="most-purchased-cards">
                                {/* Ícone com link e tooltip (Remover o link quebra o css)*/}
                                <a className="most-purchased__icon">
                                    <Link to={"/produtos"}>
                                        <i className="bi bi-star-fill" />
                                    </Link>
                                    <span className='tooltip'>Ver Mais</span>
                                </a>
                                <img src={p.image} alt="Imagem dos produtos mais comprados" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>  

            <footer style={{width: "100%"}}>
                <Footer />
            </footer>
        </>
    );
}

export default Home