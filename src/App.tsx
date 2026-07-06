import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShader = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.15;
        float d1 = length(p - vec2(0.5 * sin(t), 0.5 * cos(t * 0.8)));
        float d2 = length(p - vec2(-0.6 * cos(t * 1.1), 0.4 * sin(t * 0.9)));
        float d3 = length(p - vec2(0.3 * sin(t * 1.5), -0.5 * cos(t)));

        float val = 0.0;
        val += 0.1 / (d1 * d1 + 0.1);
        val += 0.1 / (d2 * d2 + 0.1);
        val += 0.1 / (d3 * d3 + 0.1);

        vec3 col1 = vec3(0.145, 0.388, 0.922);
        vec3 col2 = vec3(0.31, 0.275, 0.898);
        vec3 col3 = vec3(0.58, 0.31, 0.85);

        vec3 finalCol = mix(col1, col2, sin(val + t) * 0.5 + 0.5);
        finalCol = mix(finalCol, col3, cos(val - t * 0.5) * 0.5 + 0.5);

        float alpha = smoothstep(2.0, 0.0, length(p)) * 0.2;
        gl_FragColor = vec4(finalCol, alpha);
      }
    `;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    if (!program) return;

    const vs = compileShader(vertexShader, gl.VERTEX_SHADER);
    const fs = compileShader(fragmentShader, gl.FRAGMENT_SHADER);

    if (vs && fs) {
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );

      const posLocation = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(posLocation);
      gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

      const timeLocation = gl.getUniformLocation(program, 'u_time');
      const resLocation = gl.getUniformLocation(program, 'u_resolution');

      const animate = (time: number) => {
        gl.uniform1f(timeLocation, time * 0.001);
        gl.uniform2f(resLocation, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(animate);
      };

      animate(0);
    }

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div className="scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] pt-md bg-background">
        <div className="glass-panel h-16 flex justify-between items-center px-lg" style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <div className="flex items-center gap-md">
            <img alt="Halify Logo" className="w-8 h-8 rounded-lg object-contain" src="/logo.png" />
            <span className="font-bold text-headline-lg tracking-tight text-on-surface">Halify</span>
          </div>

          <div className="hidden md:flex items-center gap-xl">
            <a href="#" className="text-label-md font-semibold text-primary">Solutions</a>
            <a href="#" className="text-label-md font-medium text-on-surface-variant hover:text-primary transition-colors">Case Studies</a>
            <a href="#" className="text-label-md font-medium text-on-surface-variant hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="text-label-md font-medium text-on-surface-variant hover:text-primary transition-colors">About</a>
          </div>

          <div className="flex items-center gap-md">
            <button className="primary-cta text-on-primary px-lg py-sm rounded-xl font-semibold text-label-md">
              Get Started
            </button>
            <button className="md:hidden text-on-surface p-2">
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>

        <div className="max-w-container-max mx-auto px-lg relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center reveal">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-lg tracking-tight text-on-surface">
              Architecting the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Intelligent Edge</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-2xl">
              We design and deploy mission-critical AI agents, custom LLM architectures, and cloud infrastructure for the world's most ambitious companies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-md">
              <button className="primary-cta text-on-primary px-2xl py-lg rounded-xl font-bold text-body-md w-full sm:w-auto hover:shadow-lg transition-all">
                Launch Your Project
              </button>
              <button className="bg-surface-container-lowest border border-outline-variant text-on-surface px-2xl py-lg rounded-xl font-bold text-body-md w-full sm:w-auto hover:bg-surface-container-low transition-all">
                Explore Our Expertise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Carousel */}
      <section className="py-xl border-y border-outline-variant/20 bg-surface-container-lowest/50 overflow-hidden">
        <div className="logo-carousel-track py-sm">
          <div className="flex items-center gap-3xl px-xl grayscale opacity-50 hover:opacity-100 transition-all duration-500 cursor-default">
            <span className="font-bold flex items-center gap-sm text-on-surface">Python</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">Next.js</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">OpenAI</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">AWS Cloud</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">PostgreSQL</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">LangChain</span>
          </div>
          <div className="flex items-center gap-3xl px-xl grayscale opacity-50 hover:opacity-100 transition-all duration-500 cursor-default">
            <span className="font-bold flex items-center gap-sm text-on-surface">Python</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">Next.js</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">OpenAI</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">AWS Cloud</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">PostgreSQL</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">LangChain</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-3xl max-w-container-max mx-auto px-lg">
        <div className="mb-2xl reveal">
          <h2 className="font-headline-xl text-headline-xl mb-sm tracking-tight">Our Core Services</h2>
          <p className="text-on-surface-variant max-w-2xl text-body-md">Precision-engineered solutions tailored for production-grade AI deployment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg h-full">
          <div className="md:col-span-7 glass-card rounded-2xl p-xl flex flex-col justify-between reveal h-full">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-xl text-2xl">
                ⚙
              </div>
              <h3 className="font-headline-lg mb-md">AI Model Engineering</h3>
              <p className="text-on-surface-variant mb-xl text-body-md">Advanced LLM fine-tuning, RAG architecture optimization, and custom embedding models designed for enterprise data security.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md mb-xl">
                <div className="flex items-start gap-sm">
                  <span className="text-primary text-xl">✓</span>
                  <span className="text-label-md font-medium">Hybrid RAG Pipelines</span>
                </div>
                <div className="flex items-start gap-sm">
                  <span className="text-primary text-xl">✓</span>
                  <span className="text-label-md font-medium">Fine-tuned Foundation Models</span>
                </div>
                <div className="flex items-start gap-sm">
                  <span className="text-primary text-xl">✓</span>
                  <span className="text-label-md font-medium">Vector Database Design</span>
                </div>
                <div className="flex items-start gap-sm">
                  <span className="text-primary text-xl">✓</span>
                  <span className="text-label-md font-medium">Enterprise Security Layer</span>
                </div>
              </div>
            </div>
            <a href="#" className="flex items-center gap-sm text-primary font-bold hover:gap-md transition-all">
              Deep Dive Into AI Dev
              <span>→</span>
            </a>
          </div>

          <div className="md:col-span-5 flex flex-col gap-lg">
            <div className="glass-card rounded-2xl p-xl flex-1 reveal">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-md text-xl">
                🤖
              </div>
              <h3 className="font-headline-lg text-[20px] mb-sm">AI Agents & Workflows</h3>
              <p className="text-on-surface-variant mb-md text-sm">Autonomous multi-agent systems that coordinate complex business logic across platforms.</p>
              <a href="#" className="text-primary font-bold text-sm flex items-center gap-xs">Learn more →</a>
            </div>

            <div className="glass-card rounded-2xl p-xl flex-1 reveal">
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-md text-xl">
                ☁
              </div>
              <h3 className="font-headline-lg text-[20px] mb-sm">Cloud Infrastructure</h3>
              <p className="text-on-surface-variant mb-md text-sm">Scalable, low-latency backends built on AWS/GCP to support high-throughput AI workloads.</p>
              <a href="#" className="text-primary font-bold text-sm flex items-center gap-xs">Learn more →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-3xl bg-surface-container-low/40 relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-lg relative z-10">
          <div className="flex flex-col lg:flex-row gap-2xl items-start">
            <div className="lg:w-1/2 reveal">
              <span className="text-primary font-bold tracking-widest text-label-sm uppercase mb-md block">The Halify Difference</span>
              <h2 className="font-display-lg text-headline-xl md:text-display-lg-mobile mb-lg tracking-tight">
                Where Code Meets <span className="text-primary">Intelligence</span>.
              </h2>
              <p className="text-body-lg text-on-surface-variant mb-2xl max-w-xl">
                We've eliminated the gap between AI research and production. Our team of senior architects ensures every line of code is optimized for performance, security, and scale.
              </p>

              <div className="stats-grid grid gap-lg">
                <div className="p-lg bg-white/50 border border-outline-variant/30 rounded-2xl">
                  <div className="text-display-lg-mobile font-bold text-primary mb-xs">99.9%</div>
                  <p className="text-label-md text-on-surface-variant uppercase tracking-wider">Uptime Reliability</p>
                </div>
                <div className="p-lg bg-white/50 border border-outline-variant/30 rounded-2xl">
                  <div className="text-display-lg-mobile font-bold text-secondary mb-xs">4.2x</div>
                  <p className="text-label-md text-on-surface-variant uppercase tracking-wider">Faster Time-to-Market</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-md mt-xl lg:mt-0">
              <div className="p-xl bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm reveal">
                <div className="text-3xl mb-lg">👥</div>
                <h4 className="font-bold text-headline-lg text-lg mb-sm">Senior-Only Talent</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">No project managers or juniors. You interface directly with the engineers building your systems.</p>
              </div>
              <div className="p-xl bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm mt-md sm:mt-lg reveal">
                <div className="text-3xl mb-lg">⚡</div>
                <h4 className="font-bold text-headline-lg text-lg mb-sm">Rapid Prototyping</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">Using our internal framework 'H-Stack', we ship production-ready MVPs in under 4 weeks.</p>
              </div>
              <div className="p-xl bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm reveal">
                <div className="text-3xl mb-lg">🔒</div>
                <h4 className="font-bold text-headline-lg text-lg mb-sm">Fortified Security</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">Data privacy is our priority. All systems are architected with SOC2 and HIPAA compliance in mind.</p>
              </div>
              <div className="p-xl bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm mt-md sm:mt-lg reveal">
                <div className="text-3xl mb-lg">📊</div>
                <h4 className="font-bold text-headline-lg text-lg mb-sm">Live Monitoring</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">Post-launch support includes 24/7 monitoring and performance tuning for your AI models.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section className="py-3xl max-w-container-max mx-auto px-lg">
        <div className="text-center mb-2xl reveal">
          <h2 className="font-headline-xl tracking-tight mb-md">Our Development Lifecycle</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">A seamless transition from concept to production-scale intelligence.</p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant/30 hidden lg:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-xl relative z-10">
            <div className="glass-card p-xl rounded-2xl reveal">
              <div className="text-label-sm font-bold text-primary mb-md">STEP 01</div>
              <h4 className="font-bold mb-sm">Strategic Discovery</h4>
              <p className="text-sm text-on-surface-variant">We map out your data ecosystem and define high-impact AI opportunities.</p>
            </div>
            <div className="glass-card p-xl rounded-2xl reveal">
              <div className="text-label-sm font-bold text-primary mb-md">STEP 02</div>
              <h4 className="font-bold mb-sm">Prototyping</h4>
              <p className="text-sm text-on-surface-variant">Rapid development of the core AI logic and architectural framework.</p>
            </div>
            <div className="glass-card p-xl rounded-2xl reveal">
              <div className="text-label-sm font-bold text-primary mb-md">STEP 03</div>
              <h4 className="font-bold mb-sm">Integration</h4>
              <p className="text-sm text-on-surface-variant">Seamlessly connecting AI capabilities with your existing software stack.</p>
            </div>
            <div className="glass-card p-xl rounded-2xl reveal">
              <div className="text-label-sm font-bold text-primary mb-md">STEP 04</div>
              <h4 className="font-bold mb-sm">Scaling</h4>
              <p className="text-sm text-on-surface-variant">Continuous monitoring and optimization for real-world performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-3xl max-w-container-max mx-auto px-lg">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-3xl text-center reveal">
          <h2 className="font-headline-xl text-headline-xl mb-md">Ready to Build Something Amazing?</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto mb-2xl text-body-md">
            Let's discuss how we can transform your business with AI-powered solutions.
          </p>
          <button className="primary-cta text-on-primary px-2xl py-lg rounded-xl font-bold text-body-md hover:shadow-lg transition-all">
            Book a Discovery Call
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-low pt-3xl pb-xl border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-lg grid grid-cols-1 md:grid-cols-12 gap-2xl mb-3xl">
          <div className="md:col-span-5">
            <div className="flex items-center gap-md mb-lg">
              <img alt="Halify Logo" className="w-8 h-8 rounded-lg object-contain" src="/logo.png" />
              <span className="font-bold text-headline-lg tracking-tight text-on-surface">Halify</span>
            </div>
            <p className="text-on-surface-variant text-body-md mb-xl max-w-sm">
              Engineering the next generation of intelligent software systems. Precision, performance, and transparency at every layer.
            </p>
            <div className="flex items-center gap-xl">
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-bold">GitHub</a>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-bold">LinkedIn</a>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-bold">Email</a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-bold mb-lg">Services</h5>
            <ul className="space-y-md text-on-surface-variant text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">AI Development</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Autonomous Agents</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cloud Infrastructure</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Data Engineering</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-bold mb-lg">Company</h5>
            <ul className="space-y-md text-on-surface-variant text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Process</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h5 className="font-bold mb-lg">Stay Updated</h5>
            <p className="text-on-surface-variant text-sm mb-md">Get the latest insights on production AI.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-md py-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button className="absolute right-2 top-2 bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-container-max mx-auto px-lg pt-xl border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-md text-on-surface-variant/60 text-sm">
          <p>© 2024 Halify Engineering. All rights reserved.</p>
          <div className="flex gap-xl">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
