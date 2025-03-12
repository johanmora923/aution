import  { Component } from "react";
import PropTypes from 'prop-types';

export class ErrorBoundary extends Component {
    constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
    // Actualiza el estado para renderizar la interfaz alternativa
    error
    return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
    // Registra el error en la consola (puedes cambiar esto para usar un servicio externo si lo necesitas)
    console.error("Error capturado:", error, errorInfo);

    // Guarda los detalles del error en el estado
    this.setState({ error, errorInfo });
    }

    handleRetry = () => {
    // Restaura el estado y recarga la página
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
    };

    render() {
    if (this.state.hasError) {
        return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ color: "red" }}>¡Ups! Algo salió mal.</h1>
            <p>Por favor, intenta recargar la página.</p>
            {this.state.error && (
            <details style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
                <summary>Detalles del error</summary>
                {this.state.error.toString()}
                <br />
                {this.state.errorInfo?.componentStack}
            </details>
            )}
            <button
            onClick={this.handleRetry}
            style={{
                padding: "10px 20px",
                marginTop: "20px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
            >
            Recargar la página
            </button>
        </div>
        );
    }

    // Si no hay error, renderiza los componentes secundarios normalmente
    return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
