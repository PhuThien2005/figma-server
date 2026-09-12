#!/usr/bin/env node
// Demo Onboarding & Authentication Flow with Interactive Prototyping
// Demonstrates atomic multi-screen generation and Smart Animate wiring

const BRIDGE_URL = process.env.BRIDGE_URL || 'http://localhost:8765';

const demoFlow = {
  action: 'BATCH_EXECUTE',
  params: {
    steps: [
      // 1. Create Screen 1 (Splash)
      {
        action: 'CREATE_FRAME',
        ref: 'screen_splash',
        params: {
          name: 'Mobile / 01 - Splash',
          width: 393,
          height: 852,
          x: 0,
          y: 0,
          backgroundColor: '#0F172A',
          cornerRadius: 40,
          clipsContent: true
        }
      },
      // Splash App Title
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_splash',
          text: '⚡ NovaPay',
          fontSize: 32,
          fontFamily: 'Inter',
          fontStyle: 'Bold',
          color: '#38BDF8',
          x: 48,
          y: 280
        }
      },
      // Splash Subtitle
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_splash',
          text: 'Next-generation borderless payments.\nFast, private, and effortless.',
          fontSize: 16,
          fontFamily: 'Inter',
          fontStyle: 'Regular',
          color: '#94A3B8',
          x: 48,
          y: 340
        }
      },
      // Splash CTA Button
      {
        action: 'CREATE_BUTTON',
        ref: 'btn_get_started',
        params: {
          parentId: '$screen_splash',
          name: 'Button / Get Started',
          text: 'Get Started  →',
          backgroundColor: '#38BDF8',
          textColor: '#0F172A',
          fontSize: 16,
          cornerRadius: 16,
          paddingX: 28,
          paddingY: 16,
          x: 48,
          y: 680
        }
      },

      // 2. Create Screen 2 (Login)
      {
        action: 'CREATE_FRAME',
        ref: 'screen_login',
        params: {
          name: 'Mobile / 02 - Login',
          width: 393,
          height: 852,
          x: 480,
          y: 0,
          backgroundColor: '#0F172A',
          cornerRadius: 40,
          clipsContent: true
        }
      },
      // Login Title
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_login',
          text: 'Welcome Back 👋',
          fontSize: 28,
          fontFamily: 'Inter',
          fontStyle: 'Bold',
          color: '#F8FAFC',
          x: 32,
          y: 120
        }
      },
      // Login Subtitle
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_login',
          text: 'Enter your credentials to continue',
          fontSize: 15,
          color: '#94A3B8',
          x: 32,
          y: 165
        }
      },
      // Email Input Card
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$screen_login',
          name: 'Input / Email',
          width: 329,
          height: 56,
          x: 32,
          y: 230,
          backgroundColor: '#1E293B',
          cornerRadius: 12,
          layoutMode: 'HORIZONTAL',
          padding: 16
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_login',
          text: 'alex.doe@example.com',
          fontSize: 15,
          color: '#E2E8F0',
          x: 48,
          y: 248
        }
      },
      // Password Input Card
      {
        action: 'CREATE_FRAME',
        params: {
          parentId: '$screen_login',
          name: 'Input / Password',
          width: 329,
          height: 56,
          x: 32,
          y: 310,
          backgroundColor: '#1E293B',
          cornerRadius: 12,
          layoutMode: 'HORIZONTAL',
          padding: 16
        }
      },
      {
        action: 'CREATE_TEXT',
        params: {
          parentId: '$screen_login',
          text: '••••••••••••',
          fontSize: 16,
          color: '#E2E8F0',
          x: 48,
          y: 328
        }
      },
      // Login Submit Button
      {
        action: 'CREATE_BUTTON',
        ref: 'btn_sign_in',
        params: {
          parentId: '$screen_login',
          name: 'Button / Sign In',
          text: 'Sign In',
          backgroundColor: '#38BDF8',
          textColor: '#0F172A',
          fontSize: 16,
          cornerRadius: 16,
          paddingX: 32,
          paddingY: 16,
          x: 32,
          y: 400
        }
      },
      // Back Button on Screen 2
      {
        action: 'CREATE_BUTTON',
        ref: 'btn_back_to_splash',
        params: {
          parentId: '$screen_login',
          name: 'Button / Back',
          text: '← Back',
          backgroundColor: '#334155',
          textColor: '#F8FAFC',
          fontSize: 13,
          cornerRadius: 8,
          paddingX: 14,
          paddingY: 8,
          x: 32,
          y: 56
        }
      },

      // 3. WIRE PROTOTYPING INTERACTIONS
      // "Get Started" -> Login Screen (SMART_ANIMATE)
      {
        action: 'ADD_INTERACTION',
        params: {
          sourceNodeId: '$btn_get_started',
          targetNodeId: '$screen_login',
          trigger: 'ON_CLICK',
          transitionType: 'SMART_ANIMATE',
          duration: 0.35,
          easing: 'EASE_OUT'
        }
      },
      // "Back" -> Splash Screen (SLIDE_OUT / MOVE_IN)
      {
        action: 'ADD_INTERACTION',
        params: {
          sourceNodeId: '$btn_back_to_splash',
          targetNodeId: '$screen_splash',
          trigger: 'ON_CLICK',
          transitionType: 'SLIDE_OUT',
          direction: 'RIGHT',
          duration: 0.3,
          easing: 'EASE_OUT'
        }
      },

      // 4. REGISTER PROTOTYPE FLOW STARTING POINT
      {
        action: 'CREATE_FLOW',
        params: {
          frameId: '$screen_splash',
          flowName: 'NovaPay Onboarding Flow'
        }
      }
    ]
  }
};

async function runDemo() {
  console.log('🚀 Dispatching Onboarding Flow to Figma Bridge...');
  try {
    const res = await fetch(`${BRIDGE_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(demoFlow)
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('❌ Demo generation failed:', data.error);
      process.exit(1);
    }

    console.log('✅ Flow generated successfully in Figma!');
    console.log(`   - Steps executed: ${data.data.stepsCount}`);
    console.log('👉 Head over to Figma and press Shift + Space to test the prototype!');
  } catch (err) {
    console.error('❌ Network error:', err.message);
  }
}

runDemo();
