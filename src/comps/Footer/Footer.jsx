import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000000', borderTop: '1px solid #ddd', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '18px', color : "#666",marginBottom: '10px' }}>About Us</h3>
          <p style={{ color: '#666' }}>We're a lab committed to getting students active in design. </p>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>Important Links</h3>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            <li style={{ marginBottom: '5px'}}>
              <Link style={{ ':hover': { color: '#ffffff' } , color: '#666', textDecoration: 'none' }} href="/getting_started">
                Getting Started
              </Link>
            </li>
          </ul>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}>Location</h3>
          <p style={{ color: '#666' }}>1185 Perry St</p>
          <p style={{ color: '#666' }}>Blacksburg, VA 24060</p>
          <p style={{ color: '#666' }}>Room 200</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
