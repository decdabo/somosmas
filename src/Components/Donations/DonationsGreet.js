import "./styles/donations.scss";

export const DonationsGreet = ({
                                   title = "Se parte del cambio para las familias de La Cava",
                               }) => {
    return (
        <div>
            <h1 className="txt-center"> { title } </h1>
            <div className="d-flex justify-content-around my-5">
                <div>
                    <a href="https://mpago.la/2RW1MWq" className="donations-div-link" target="_blank">
                        $100
                    </a>
                </div>
                <div>
                    <a href="https://mpago.la/2CUYssg" className="donations-div-link" target="_blank">
                        $500
                    </a>
                </div>
                <div>
                    <a href="https://mpago.la/24eQKk4" className="donations-div-link" target="_blank">
                        $1000
                    </a>
                </div>
                <div>
                    <a href="https://mpago.la/2epKeEX" className="donations-div-link" target="_blank">
                        $2000
                    </a>
                </div>

                <div>
                    <a href="https://mpago.la/1xtazSs" className="donations-div-link" target="_blank">
                        $5000
                    </a>
                </div>


            </div>


        </div>
    );
};
