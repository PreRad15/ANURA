import React from "react";
import AnuraLogo from '../assets/Anura.png'; // Importing the logo

export default function About({ CommandBar }) {
  return (
    <>
      <CommandBar left={{ type: "back" }} />
      <div className="section text-center">

        {/* Logo */}
        <img 
            src={AnuraLogo} 
            alt="Anura App Logo" 
            style={{ 
                width: '150px', 
                height: '150px', 
                margin: '20px auto',
                borderRadius: '20px', // giving rounded corners for the logo
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' // shadow effect
            }} 
        />

        <h1 className="big-title" style={{ color: '#4A0D66' }}>ANURA</h1>
        <p className="lead text-muted mb-5">User-friendly and reliable accounting software for store management.</p>

        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}>
            {/* Project details Section */}
            <div className="card mb-4" style={{borderWidth: '2px', borderColor: '#E0E0E0'}}>
                <div className="card-body">
                    <h5 className="card-title">About the Project</h5>
                    <p className="card-text">
                        ANURA is a user-friendly and reliable store management web application designed to simplify day-to-day business operations for small and medium retailers. It provides a complete solution for managing inventory, generating bills, and tracking sales — all from a clean, intuitive interface.
                    </p>
                </div>
            </div>

            {/* Tech Stack Section */}
            <div className="card mb-4" style={{borderWidth: '2px', borderColor: '#E0E0E0'}}>
                <div className="card-body">
                    <h5 className="card-title">Tech Stack</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Frontend:</strong> React & Bootstrap</li>
                        <li className="list-group-item"><strong>Backend:</strong> Node.js & Express.js</li>
                        <li className="list-group-item"><strong>Database:</strong> MongoDB</li>
                    </ul>
                </div>
            </div>

            {/* Creator Information Section */}
            <div className="card" style={{borderWidth: '2px', borderColor: '#E0E0E0'}}>
                <div className="card-body">
                    <h5 className="card-title">Created By</h5>
                    <p className="card-text mb-1">Aaryasingh Santoshkumar Thakur</p>
                    <p className="card-text text-muted">Matriculation Number: 42311536</p>
                    <p className="card-text text-muted">Created For IU Germany</p>
                    <p className="card-text text-muted">Course: Project Java And Web Development</p>
                    <p className="card-text text-muted">Course Code: DLBSCPJWD01</p>
                </div>
            </div>
        </div>

      </div>
    </>
  );
}

