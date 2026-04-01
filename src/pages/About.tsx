import {useState } from "react";

// Componentes
import Footer from "../componentes/Footer";

// Imagem
import wallpaper from "../assets/img/business-wallpaper.jpg";

function About(){
    const [loading] = useState(true);

    if(!loading) return <p>Carregando a página...</p>

    return(
        <>
            <section className="about-container">
                <div className="left-side template">
                    <div className="left-side__header">
                        <h2 className="left-side__title">Nosso objetivo é conectar nossos clientes aos seus animes favoritos</h2>
                    </div>
                    <div className="left-side__our-objective">
                        <p className="our-objective__paragraph">Nam ultricies mattis orci sit amet efficitur. In consectetur eu lorem sed feugiat. 
                            Praesent et quam maximus, lacinia neque id, cursus nisi. Pellentesque nec suscipit massa. 
                            Fusce placerat sodales nisl at tristique. Suspendisse potenti. Duis in leo tristique, 
                            ultricies justo eget, placerat nunc. Aliquam aliquet elit sit amet nunc facilisis, 
                            in porttitor velit pulvinar. Nullam molestie tellus quis orci pharetra, ut varius leo rutrum. 
                            Morbi scelerisque, odio eu interdum consectetur, risus enim sodales lectus, et convallis risus sem ut leo. 
                            Duis venenatis, mauris eget suscipit viverra, nulla ante placerat mauris, a vulputate tortor lorem sed dolor. 
                            Proin pretium urna sed luctus malesuada. Vivamus vehicula velit in risus placerat commodo.
                        </p>
                    </div>
                </div>
                <div className="right-side template">
                    <div className="wallpaper-section">
                        <img src={wallpaper} className="wallpaper-section__img" alt="Wallpaper principal" />
                    </div>
                    <div className="achievements-section">
                        <div className="achievements-square">
                            <h3>5</h3>
                            <p>Anos no Mercado</p>
                        </div>
                        <div className="achievements-square">
                            <h3>1000+</h3>
                            <p>Clientes Satisfeitos</p>
                        </div>
                        <div className="achievements-square">
                            <h3>2000+</h3>
                            <p>Produtos Vendidos</p>
                        </div>
                        <div className="achievements-square">
                            <h3>850+</h3>
                            <p>Reviews</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer style={{width: "100%"}}>
                <Footer />
            </footer>
        </>
    );
}

export default About;