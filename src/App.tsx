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
            <div className="inline-block mb-lg px-lg py-sm bg-primary/10 rounded-full border border-primary/30">
              <span className="text-primary font-semibold text-label-md">Trusted AI Development Partner for Startups and Enterprises</span>
            </div>

            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-lg tracking-tight text-on-surface">
              Build AI Products That Drive <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Real Business Growth</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto mb-2xl">
              Halify transforms ideas into production-ready software through AI engineering, full stack development, mobile applications, cloud infrastructure, and intelligent automation. Whether you need an AI agent, a SaaS platform, or an enterprise solution, we build scalable products that deliver measurable results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-md">
              <button className="primary-cta text-on-primary px-2xl py-lg rounded-xl font-bold text-body-md w-full sm:w-auto hover:shadow-lg transition-all">
                Start Your Project
              </button>
              <button className="bg-surface-container-lowest border border-outline-variant text-on-surface px-2xl py-lg rounded-xl font-bold text-body-md w-full sm:w-auto hover:bg-surface-container-low transition-all">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-xl border-y border-outline-variant/20 bg-surface-container-lowest/50 overflow-hidden">
        <div className="logo-carousel-track py-sm">
          <div className="flex items-center gap-3xl px-xl grayscale opacity-50 hover:opacity-100 transition-all duration-500 cursor-default">
            <span className="font-bold flex items-center gap-sm text-on-surface">OpenAI</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">Anthropic</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">LangChain</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">FastAPI</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">React</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">PostgreSQL</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">AWS</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">Docker</span>
          </div>
          <div className="flex items-center gap-3xl px-xl grayscale opacity-50 hover:opacity-100 transition-all duration-500 cursor-default">
            <span className="font-bold flex items-center gap-sm text-on-surface">OpenAI</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">Anthropic</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">LangChain</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">FastAPI</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">React</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">PostgreSQL</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">AWS</span>
            <span className="font-bold flex items-center gap-sm text-on-surface">Docker</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-3xl max-w-container-max mx-auto px-lg">
        <div className="mb-2xl reveal">
          <h2 className="font-headline-xl text-headline-xl mb-sm tracking-tight">Our Services</h2>
          <p className="text-on-surface-variant max-w-2xl text-body-md">Comprehensive development solutions from AI to cloud infrastructure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          <div className="glass-card rounded-2xl p-xl reveal">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-md text-xl">
              🤖
            </div>
            <h3 className="font-headline-lg text-[20px] mb-sm">AI Development</h3>
            <p className="text-on-surface-variant mb-md text-sm">Custom AI applications, generative AI solutions, and business AI integration powered by modern LLMs.</p>
          </div>

          <div className="glass-card rounded-2xl p-xl reveal">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-md text-xl">
              🧠
            </div>
            <h3 className="font-headline-lg text-[20px] mb-sm">AI Agent Development</h3>
            <p className="text-on-surface-variant mb-md text-sm">Autonomous agents for customer support, research, sales, marketing, and business automation.</p>
          </div>

          <div className="glass-card rounded-2xl p-xl reveal">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-md text-xl">
              🔗
            </div>
            <h3 className="font-headline-lg text-[20px] mb-sm">Multi Agent Systems</h3>
            <p className="text-on-surface-variant mb-md text-sm">Collaborative AI ecosystems where specialized agents work together for complex workflows.</p>
          </div>

          <div className="glass-card rounded-2xl p-xl reveal">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-md text-xl">
              📚
            </div>
            <h3 className="font-headline-lg text-[20px] mb-sm">RAG Solutions</h3>
            <p className="text-on-surface-variant mb-md text-sm">Transform company knowledge into intelligent assistants with semantic search and vector databases.</p>
          </div>

          <div className="glass-card rounded-2xl p-xl reveal">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-md text-xl">
              💬
            </div>
            <h3 className="font-headline-lg text-[20px] mb-sm">AI Chatbots</h3>
            <p className="text-on-surface-variant mb-md text-sm">Conversational assistants for websites, mobile apps, WhatsApp, Slack, Teams, and custom platforms.</p>
          </div>

          <div className="glass-card rounded-2xl p-xl reveal">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-md text-xl">
              💻
            </div>
            <h3 className="font-headline-lg text-[20px] mb-sm">Full Stack Development</h3>
            <p className="text-on-surface-variant mb-md text-sm">Modern web applications with React, Next.js, FastAPI, and scalable cloud architecture.</p>
          </div>

          <div className="glass-card rounded-2xl p-xl reveal">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-md text-xl">
              📱
            </div>
            <h3 className="font-headline-lg text-[20px] mb-sm">Mobile Development</h3>
            <p className="text-on-surface-variant mb-md text-sm">iOS, Android, and cross-platform applications including progressive web apps and AI-powered mobile solutions.</p>
          </div>

          <div className="glass-card rounded-2xl p-xl reveal">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-md text-xl">
              ☁️
            </div>
            <h3 className="font-headline-lg text-[20px] mb-sm">Cloud & DevOps</h3>
            <p className="text-on-surface-variant mb-md text-sm">AWS, Azure, and GCP deployment with Docker, Kubernetes, CI/CD, and infrastructure automation.</p>
          </div>

          <div className="glass-card rounded-2xl p-xl reveal">
            <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-md text-xl">
              🔌
            </div>
            <h3 className="font-headline-lg text-[20px] mb-sm">API Development</h3>
            <p className="text-on-surface-variant mb-md text-sm">REST and GraphQL APIs with authentication, rate limiting, third-party integrations, and payment gateways.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Halify */}
      <section className="py-3xl bg-surface-container-low/40 relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-lg relative z-10">
          <div className="reveal mb-2xl">
            <h2 className="font-headline-xl text-headline-xl mb-sm tracking-tight">Why Businesses Choose Halify</h2>
            <p className="text-on-surface-variant max-w-2xl text-body-md">Expertise, reliability, and partnership that drives business growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            <div className="p-xl bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm reveal">
              <div className="text-3xl mb-lg">🧠</div>
              <h4 className="font-bold text-headline-lg text-lg mb-sm">AI Expertise</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Engineers specializing in modern AI including LLMs, AI Agents, RAG, workflow automation, and intelligent systems.</p>
            </div>

            <div className="p-xl bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm reveal">
              <div className="text-3xl mb-lg">🔄</div>
              <h4 className="font-bold text-headline-lg text-lg mb-sm">End-to-End Development</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">From idea validation to deployment and long-term maintenance, we handle every stage of product development.</p>
            </div>

            <div className="p-xl bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm reveal">
              <div className="text-3xl mb-lg">✅</div>
              <h4 className="font-bold text-headline-lg text-lg mb-sm">Production Ready</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Scalable, secure, and maintainable software designed for real users with monitoring and testing from day one.</p>
            </div>

            <div className="p-xl bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm reveal">
              <div className="text-3xl mb-lg">⚡</div>
              <h4 className="font-bold text-headline-lg text-lg mb-sm">Fast Delivery</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Efficient planning, agile development, and transparent communication deliver projects quickly without sacrificing quality.</p>
            </div>

            <div className="p-xl bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm reveal">
              <div className="text-3xl mb-lg">💬</div>
              <h4 className="font-bold text-headline-lg text-lg mb-sm">Transparent Communication</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Regular updates, clear timelines, milestone tracking, and direct communication throughout every project.</p>
            </div>

            <div className="p-xl bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm reveal">
              <div className="text-3xl mb-lg">📈</div>
              <h4 className="font-bold text-headline-lg text-lg mb-sm">Scalable Architecture</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Applications built to support business growth, increasing traffic, and future feature expansion effortlessly.</p>
            </div>

            <div className="p-xl bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm reveal">
              <div className="text-3xl mb-lg">🔒</div>
              <h4 className="font-bold text-headline-lg text-lg mb-sm">Security First</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Authentication, encryption, secure APIs, and cloud best practices integrated into every solution.</p>
            </div>

            <div className="p-xl bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm reveal">
              <div className="text-3xl mb-lg">🤝</div>
              <h4 className="font-bold text-headline-lg text-lg mb-sm">Long-Term Partnership</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">We provide continuous improvements, support, and optimization after launch for lasting success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-3xl max-w-container-max mx-auto px-lg">
        <div className="text-center mb-2xl reveal">
          <h2 className="font-headline-xl tracking-tight mb-md">Our Development Process</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">From discovery to long-term support, we guide you through every step.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          <div className="glass-card p-xl rounded-2xl reveal">
            <div className="text-label-sm font-bold text-primary mb-md">01</div>
            <h4 className="font-bold mb-sm">Discovery</h4>
            <p className="text-sm text-on-surface-variant">Understand your business goals, users, competitors, and technical requirements.</p>
          </div>
          <div className="glass-card p-xl rounded-2xl reveal">
            <div className="text-label-sm font-bold text-primary mb-md">02</div>
            <h4 className="font-bold mb-sm">Strategy</h4>
            <p className="text-sm text-on-surface-variant">Plan architecture, timelines, milestones, and technology choices.</p>
          </div>
          <div className="glass-card p-xl rounded-2xl reveal">
            <div className="text-label-sm font-bold text-primary mb-md">03</div>
            <h4 className="font-bold mb-sm">Design</h4>
            <p className="text-sm text-on-surface-variant">Create intuitive interfaces and seamless user experiences.</p>
          </div>
          <div className="glass-card p-xl rounded-2xl reveal">
            <div className="text-label-sm font-bold text-primary mb-md">04</div>
            <h4 className="font-bold mb-sm">Development</h4>
            <p className="text-sm text-on-surface-variant">Build scalable, maintainable, and production-ready software.</p>
          </div>
          <div className="glass-card p-xl rounded-2xl reveal">
            <div className="text-label-sm font-bold text-primary mb-md">05</div>
            <h4 className="font-bold mb-sm">Testing</h4>
            <p className="text-sm text-on-surface-variant">Perform quality assurance, security testing, and performance optimization.</p>
          </div>
          <div className="glass-card p-xl rounded-2xl reveal">
            <div className="text-label-sm font-bold text-primary mb-md">06</div>
            <h4 className="font-bold mb-sm">Deployment</h4>
            <p className="text-sm text-on-surface-variant">Launch securely with monitoring, backups, and cloud infrastructure.</p>
          </div>
          <div className="glass-card p-xl rounded-2xl col-span-1 md:col-span-2 lg:col-span-4 reveal">
            <div className="text-label-sm font-bold text-primary mb-md">07</div>
            <h4 className="font-bold mb-sm">Support</h4>
            <p className="text-sm text-on-surface-variant">Ongoing maintenance, feature enhancements, and technical support for continuous improvement.</p>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-3xl max-w-container-max mx-auto px-lg">
        <div className="text-center mb-2xl reveal">
          <h2 className="font-headline-xl tracking-tight mb-md">What Our Clients Say</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">Real feedback from companies we've partnered with.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div className="glass-card p-xl rounded-2xl reveal">
            <div className="flex gap-sm mb-md">
              <span className="text-lg">★★★★★</span>
            </div>
            <p className="text-on-surface-variant mb-lg text-body-md italic">"Halify exceeded every expectation. They delivered a production-ready AI platform that significantly improved our customer support efficiency while maintaining exceptional communication throughout the project."</p>
            <div>
              <p className="font-bold text-on-surface">Sarah Thompson</p>
              <p className="text-on-surface-variant text-sm">CEO, SaaS Startup</p>
            </div>
          </div>

          <div className="glass-card p-xl rounded-2xl reveal">
            <div className="flex gap-sm mb-md">
              <span className="text-lg">★★★★★</span>
            </div>
            <p className="text-on-surface-variant mb-lg text-body-md italic">"The quality of engineering, attention to detail, and technical expertise were outstanding. The team delivered on time and helped us launch successfully."</p>
            <div>
              <p className="font-bold text-on-surface">Michael Rodriguez</p>
              <p className="text-on-surface-variant text-sm">Founder, HealthTech Company</p>
            </div>
          </div>

          <div className="glass-card p-xl rounded-2xl reveal">
            <div className="flex gap-sm mb-md">
              <span className="text-lg">★★★★★</span>
            </div>
            <p className="text-on-surface-variant mb-lg text-body-md italic">"Our automation platform reduced manual work by over sixty percent within the first month. Halify became more than a development partner—they became part of our growth journey."</p>
            <div>
              <p className="font-bold text-on-surface">David Lee</p>
              <p className="text-on-surface-variant text-sm">Operations Director</p>
            </div>
          </div>

          <div className="glass-card p-xl rounded-2xl reveal">
            <div className="flex gap-sm mb-md">
              <span className="text-lg">★★★★★</span>
            </div>
            <p className="text-on-surface-variant mb-lg text-body-md italic">"The project management, architecture decisions, and software quality were excellent. We would gladly work with Halify again."</p>
            <div>
              <p className="font-bold text-on-surface">Emily Carter</p>
              <p className="text-on-surface-variant text-sm">Product Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-3xl max-w-container-max mx-auto px-lg">
        <div className="text-center mb-2xl reveal">
          <h2 className="font-headline-xl tracking-tight mb-md">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg max-w-3xl mx-auto">
          <div className="glass-card p-xl rounded-2xl reveal">
            <h4 className="font-bold mb-sm text-on-surface">How long does a project take?</h4>
            <p className="text-on-surface-variant text-sm">Project timelines depend on complexity. Small projects typically require two to four weeks, while enterprise platforms may take several months.</p>
          </div>

          <div className="glass-card p-xl rounded-2xl reveal">
            <h4 className="font-bold mb-sm text-on-surface">Can you improve existing software?</h4>
            <p className="text-on-surface-variant text-sm">Yes. We modernize legacy systems, add AI capabilities, improve performance, and expand existing products.</p>
          </div>

          <div className="glass-card p-xl rounded-2xl reveal">
            <h4 className="font-bold mb-sm text-on-surface">Do you provide post-launch support?</h4>
            <p className="text-on-surface-variant text-sm">Yes. We offer maintenance, monitoring, optimization, and continuous feature development.</p>
          </div>

          <div className="glass-card p-xl rounded-2xl reveal">
            <h4 className="font-bold mb-sm text-on-surface">Can you sign an NDA?</h4>
            <p className="text-on-surface-variant text-sm">Absolutely. Client confidentiality and data security are priorities for every engagement.</p>
          </div>

          <div className="glass-card p-xl rounded-2xl reveal">
            <h4 className="font-bold mb-sm text-on-surface">Do you work with startups?</h4>
            <p className="text-on-surface-variant text-sm">Yes. We collaborate with startups, SMEs, and enterprise organizations worldwide.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-3xl max-w-container-max mx-auto px-lg">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-3xl text-center reveal">
          <h2 className="font-headline-xl text-headline-xl mb-md">Ready to Build Your Next AI Product?</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-lg text-body-md">
            Whether you're launching a startup, modernizing an existing platform, or integrating artificial intelligence into your business, Halify has the expertise to turn your vision into reality.
          </p>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-2xl text-body-md font-semibold">
            Let's build intelligent software that delivers measurable business impact.
          </p>
          <button className="primary-cta text-on-primary px-2xl py-lg rounded-xl font-bold text-body-md hover:shadow-lg transition-all">
            Start Your Project Today
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
              An AI-first software development company focused on building intelligent digital products for startups, growing businesses, and enterprise teams.
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
              <li><a href="#" className="hover:text-primary transition-colors">AI Agents</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Full Stack Dev</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cloud & DevOps</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-bold mb-lg">Company</h5>
            <ul className="space-y-md text-on-surface-variant text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Our Process</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h5 className="font-bold mb-lg">Stay Updated</h5>
            <p className="text-on-surface-variant text-sm mb-md">Get the latest insights on AI and software development.</p>
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
          <p>© 2024 Halify. All rights reserved.</p>
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
