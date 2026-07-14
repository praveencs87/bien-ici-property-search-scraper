FROM apify/actor-node-playwright-chrome:20

COPY --chown=myuser package*.json ./

RUN npm --quiet set progress=false \
    && npm install \
    && echo "Installed NPM packages:" \
    && (npm list || true) \
    && echo "Node.js version:" \
    && node --version \
    && echo "NPM version:" \
    && npm --version

COPY --chown=myuser . ./

RUN npm run build \
    && npm prune --omit=dev

CMD npm start
